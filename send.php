<?php
header('Content-Type: application/json');
$secret = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
$data = json_decode(file_get_contents('php://input'), true);
$token = $data['recaptcha_token'] ?? '';

// Verify with Google
$verify = file_get_contents(
  "https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$token}"
);
$result = json_decode($verify);

if ($result->success && $result->score >= 0.5 && $result->action === 'contact_form') {
  $to      = 'eric.latendresse@gmail.com';
  $subject = 'New Contact: ' . htmlspecialchars($data['name']);
  $body    = htmlspecialchars($data['message']);
  $headers = 'From: ' . htmlspecialchars($data['email']);
  mail($to, $subject, $body, $headers);
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false]);
}
?>