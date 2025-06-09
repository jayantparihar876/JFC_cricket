// Constants
const upiId = "mrprinceparihar007@okhdfcbank";
const payeeName = "JFC Box Cricket";
const adminPhone = "+918302507327";
const adminEmail = "jfccricket@example.com";

// Registration form handling
document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const package = document.getElementById('package').value;
  const packageText = document.getElementById('package').options[document.getElementById('package').selectedIndex].text;
  
  // Show payment options
  document.getElementById('paymentOptions').style.display = 'block';
  document.getElementById('selectedPackageTitle').textContent = packageText.split(' - ')[0];
  document.getElementById('selectedPackageDesc').textContent = packageText;
  document.getElementById('payNowBtn').textContent = `Pay ₹${package} Now`;
  document.getElementById('qr-instruction').textContent = `Scan to pay ₹${package}`;
  
  // Set up payment button
  document.getElementById('payNowBtn').onclick = function() {
    generateQR(package);
  };
  
  // Scroll to payment options
  document.getElementById('paymentOptions').scrollIntoView({ behavior: 'smooth' });
  
  // Show success message
  showNotification('Registration successful! Please proceed with payment.', 'success');
  
  // Log registration details
  console.log('Registration details:', { name, phone, email, package });
  
  // Prepare notifications
  const whatsappUrl = `https://wa.me/${adminPhone}?text=New%20Registration%20for%20JFC%20Box%20Cricket%0AName%3A%20${encodeURIComponent(name)}%0APhone%3A%20${encodeURIComponent(phone)}%0AEmail%3A%20${encodeURIComponent(email || 'Not provided')}%0APackage%3A%20${encodeURIComponent(packageText)}`;
  
  const emailSubject = `New Registration: ${name}`;
  const emailBody = `New registration details:%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(email || 'Not provided')}%0APackage: ${encodeURIComponent(packageText)}`;
  
  // Open notification links
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    window.open(`mailto:${adminEmail}?subject=${emailSubject}&body=${emailBody}`, '_blank');
  }, 1000);
});

// Generate QR code function
function generateQR(amount) {
  // Generate the UPI payment link
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
  
  // Generate QR code using a free API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;
  
  // Display the QR code
  const qrImage = document.getElementById('qr-img');
  qrImage.src = qrCodeUrl;
  qrImage.alt = `Pay ₹${amount} QR Code`;
  document.getElementById('qr-container').style.display = 'block';
  
  // Scroll to the QR code
  document.getElementById('qr-container').scrollIntoView({ behavior: 'smooth' });
}

// Show notification function
function showNotification(message, type) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = 'notification ' + type;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
  
}
