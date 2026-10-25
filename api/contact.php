<?php
// api/contact.php - Walk Hike Climb Secure Inquiry Handler
declare(strict_types=1);

// Configuration
$TEST_MODE = true; // Set to false when deploying live to Afrihost
$RECIPIENT_EMAIL = 'walkhikeclimb@gmail.com';
$SITE_NAME = 'Walk Hike Climb (SRT)';
$RATE_LIMIT_FILE = __DIR__ . '/../logs/rate_limit.json';
$LOGS_DIR = __DIR__ . '/../test_emails';

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// 1. Anti-Spam Honeypot Check
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true) ?? $_POST;

if (!empty($input['_hp_company'])) {
    // Bot caught by honeypot; respond success silently without processing
    echo json_encode(['success' => true, 'message' => 'Inquiry received.']);
    exit;
}

// 2. IP Rate Limiting (Max 5 submissions per 10 mins)
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
if (!is_dir(dirname($RATE_LIMIT_FILE))) {
    mkdir(dirname($RATE_LIMIT_FILE), 0750, true);
}
$rateData = file_exists($RATE_LIMIT_FILE) ? json_decode(file_get_contents($RATE_LIMIT_FILE), true) : [];
$currentTime = time();
$ipHistory = array_filter($rateData[$clientIp] ?? [], fn($t) => ($currentTime - $t) < 600);

if (count($ipHistory) >= 5) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'Too many requests. Please wait a few minutes before trying again.']);
    exit;
}
$ipHistory[] = $currentTime;
$rateData[$clientIp] = $ipHistory;
file_put_contents($RATE_LIMIT_FILE, json_encode($rateData));

// 3. Strict Input Sanitization & Validation
$name = trim(filter_var($input['name'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$email = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone = trim(preg_replace('/[^0-9+\s\-()]/', '', (string)($input['phone'] ?? '')));
$country = trim(filter_var($input['country'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$package = trim(filter_var($input['package'] ?? 'General Inquiry', FILTER_SANITIZE_SPECIAL_CHARS));
$groupSize = filter_var($input['groupSize'] ?? 1, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 50]]) ?: 1;
$date = trim(preg_replace('/[^0-9\-]/', '', (string)($input['date'] ?? '')));
$message = trim(filter_var($input['message'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));

// Header Injection Defense
if (preg_match("/[\r\n]/", $name) || preg_match("/[\r\n]/", (string)$email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid header characters.']);
    exit;
}

if (!$name || strlen($name) < 2) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid name (at least 2 characters).']);
    exit;
}

if (!$email) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid email address.']);
    exit;
}

// 4. Build Structured Email Content
$subject = "New Inquiry: [{$package}] from {$name}";
$emailBody = "Walk Hike Climb - Website Inquiry\n" .
             "===================================\n" .
             "Timestamp:  " . date('Y-m-d H:i:s') . "\n" .
             "Name:       {$name}\n" .
             "Email:      {$email}\n" .
             "Phone:      " . ($phone ?: 'Not provided') . "\n" .
             "Country:    " . ($country ?: 'Not specified') . "\n" .
             "Package:    {$package}\n" .
             "Group Size: {$groupSize}\n" .
             "Date:       " . ($date ?: 'Flexible') . "\n\n" .
             "Notes / Message:\n" .
             "{$message}\n";

// 5. Delivery Mode: Local Mock File Logger vs Production Afrihost SMTP
if ($TEST_MODE) {
    if (!is_dir($LOGS_DIR)) {
        mkdir($LOGS_DIR, 0750, true);
    }
    $filename = $LOGS_DIR . '/inquiry_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.txt';
    file_put_contents($filename, $emailBody);
    echo json_encode([
        'success' => true,
        'mode' => 'test_mock',
        'message' => "Inquiry successfully logged locally in test mode.",
        'file' => basename($filename)
    ]);
    exit;
}

// Production Afrihost SMTP / Mail delivery
$headers = [
    'From' => "inquiries@walkhikeclimb.co.za",
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion()
];
$sent = mail($RECIPIENT_EMAIL, $subject, $emailBody, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Your inquiry has been sent to Ian and Diane Naidoo.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Unable to send email right now. Please message via WhatsApp.']);
}
