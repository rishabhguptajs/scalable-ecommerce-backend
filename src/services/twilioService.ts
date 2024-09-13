import Twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = Twilio(accountSid, authToken, {
    logLevel: 'debug'
})

const sendSMS = async(to: string, message: string) => {
    try {
        const response = await client.messages.create({
            body: message,
            to: to,
            from: process.env.TWILIO_PHONE_NUMBER
        })

        return { message: 'SMS sent successfully', response };
    } catch (error: any) {
        throw new Error(`Error sending SMS: ${error.message}`)
    }
}

const sendWhatsappMessage = async(to: string, message: string) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
            to: 'whatsapp:' + to
        })

        return { message: 'WhatsApp message sent successfully', response };
    } catch (error: any) {
        throw new Error(`Error sending WhatsApp message: ${error.message}`)
    }
}