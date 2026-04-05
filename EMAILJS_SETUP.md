# EmailJS Setup Guide for Contact Form

## 📧 Step-by-Step Setup

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up Free"**
3. Sign up with your email (hassanmehedi379@gmail.com)
4. Verify your email

---

### Step 2: Add Email Service

1. After logging in, go to **"Email Services"** tab
2. Click **"Add New Service"**
3. Choose **Gmail** (or your email provider)
4. Click **"Connect Account"**
5. Log in with your Gmail account
6. Grant permissions
7. Note down the **Service ID** (looks like: `service_xxxxxxx`)

---

### Step 3: Create Email Template

1. Go to **"Email Templates"** tab
2. Click **"Create New Template"**
3. Choose a template or start from scratch
4. Set up the template:

**Template Settings:**
- **To Email**: `{{to_email}}` (your email: hassanmehedi379@gmail.com)
- **Subject**: `New Message from {{from_name}}`
- **Content**:
```
Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

5. Click **"Save"**
6. Note down the **Template ID** (looks like: `template_xxxxxxx`)

---

### Step 4: Get Your Public Key

1. Go to **"Account"** (click your profile icon)
2. Go to **"API Keys"** or **"General"** tab
3. Copy your **Public Key** (looks like: `user_xxxxxxxxxxxx`)

---

### Step 5: Update Code with Your Credentials

Open `src/App.jsx` and find this section (around line 650):

```javascript
const serviceID = 'YOUR_SERVICE_ID';
const templateID = 'YOUR_TEMPLATE_ID';
const publicKey = 'YOUR_PUBLIC_KEY';
```

Replace with your actual credentials:

```javascript
const serviceID = 'service_abc123';      // Your Service ID
const templateID = 'template_xyz789';     // Your Template ID
const publicKey = 'user_def456ghi';       // Your Public Key
```

---

### Step 6: Test It!

1. Run your app: `npm run dev`
2. Go to the Contact section
3. Fill out the form
4. Click "Send Message"
5. Check your email (hassanmehedi379@gmail.com)

---

## ✅ What You'll Need:

- **Service ID**: From Email Services page
- **Template ID**: From Email Templates page  
- **Public Key**: From Account/API Keys page

---

## 🎯 Example Configuration:

```javascript
const serviceID = 'service_gmail';
const templateID = 'template_portfolio_contact';
const publicKey = 'user_abc123def456';
```

---

## 💡 Tips:

1. **Free Plan**: 200 emails/month (plenty for a portfolio)
2. **Customize Template**: Add styling, auto-replies, etc.
3. **Test First**: Send test emails before deploying
4. **Security**: Public key is safe to expose (it's designed for frontend)

---

## 🔧 Troubleshooting:

**Email not sending?**
- Check browser console for errors
- Verify all 3 credentials are correct
- Make sure template variables match: `{{from_name}}`, `{{from_email}}`, `{{message}}`

**Getting error messages?**
- Check EmailJS dashboard for delivery status
- Verify your Gmail account is connected
- Check spam folder

---

## 🚀 After Setup:

Once configured, every message sent through your contact form will:
✅ Arrive in your Gmail inbox
✅ Show sender's name and email
✅ Include their message
✅ Be free (up to 200/month)

Good luck! 🎉
