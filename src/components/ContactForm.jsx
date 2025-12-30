'use client'

import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import styles from './ContactForm.module.css'

const ContactForm = () => {
  const [ form ] = Form.useForm()
  const [ loading, setLoading ] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        message.success('Message sent successfully!')
        form.resetFields()
      } else {
        const errorData = await response.json().catch(() => ({}))
        message.error(errorData.message || 'Failed to send message.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      message.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className = { styles.formContainer }>
      <h2 className = { styles.formTitle }>Contact Us</h2>
      <Form
        form = { form }
        layout = "vertical"
        onFinish = { onFinish }
        autoComplete = "off"
      >
        <Form.Item
          label = "Name"
          name = "name"
          rules = { [
            { required: true, message: 'Please input your name!' },
            { min: 2, message: 'Name must be at least 2 characters.' }
          ] }
        >
          <Input placeholder = "Your Name" />
        </Form.Item>

        <Form.Item
          label = "Email"
          name = "email"
          rules = { [
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ] }
        >
          <Input placeholder = "your.email@example.com" />
        </Form.Item>

        <Form.Item
          label = "Phone"
          name = "phone"
          rules = { [
            { pattern: /^\d{10,}$/, message: 'Please enter a valid phone number (at least 10 digits).' }
          ] }
        >
          <Input placeholder = "(123) 456-7890" />
        </Form.Item>

        <Form.Item
          label = "Message"
          name = "message"
          rules = { [
            { required: true, message: 'Please input your message!' },
            { min: 10, message: 'Message must be at least 10 characters.' }
          ] }
        >
          <Input.TextArea rows = { 4 } placeholder = "How can we help you?" />
        </Form.Item>

        <Form.Item>
          <Button type = "primary" htmlType = "submit" loading = { loading } className = { styles.submitButton }>
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ContactForm

