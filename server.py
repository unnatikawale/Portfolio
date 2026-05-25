import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
# pyrefly: ignore [missing-import]
from flask import Flask, request, jsonify

app = Flask(__name__)

# Configure SMTP Gmail Settings
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
MAIL_USERNAME = "unnatikawale43@gmail.com"
MAIL_PASSWORD = "djxw wvbu vqms gimj"  # App Password from Gmail
RECIPIENT_EMAIL = "unnatikawale43@gmail.com"

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/api/contact', methods=['POST', 'OPTIONS'])
def contact():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone', 'N/A')
        subject = data.get('subject')
        message = data.get('message')

        if not all([name, email, subject, message]):
            return jsonify({"error": "Missing required fields (name, email, subject, message)"}), 400

        # Construct Email Message
        msg = MIMEMultipart()
        msg['From'] = MAIL_USERNAME
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = f"New Contact: {subject} - From {name}"

        body = f"""
You have received a new contact message from your portfolio website.

--------------------------------------------------
Sender Information Details:
Name: {name}
Email: {email}
Phone: {phone}
Subject: {subject}
--------------------------------------------------

Message Body:
{message}
"""
        msg.attach(MIMEText(body, 'plain'))

        # Connect to Gmail SMTP Server and Send Email
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        server.sendmail(MAIL_USERNAME, RECIPIENT_EMAIL, msg.as_string())
        server.quit()

        return jsonify({"success": True, "message": "Email sent successfully!"}), 200

    except Exception as e:
        print(f"Error occurred in backend: {str(e)}")
        return jsonify({"error": f"Failed to send email: {str(e)}"}), 500

if __name__ == '__main__':
    print("-------------------------------------------------------------------")
    print("Portfolio Backend server is running successfully!")
    print("API Endpoint active: http://127.0.0.1:5000/api/contact")
    print("-------------------------------------------------------------------")
    app.run(host='127.0.0.1', port=5000, debug=True)
