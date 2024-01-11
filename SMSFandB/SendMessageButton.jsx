import React, { useState } from 'react';
import axios from 'axios';

const SendMessageButton = () => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSendMessage = async () => {
    setSending(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('/api/send-message', { userId: 1 }); // Replace userId with the actual user ID
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <button onClick={handleSendMessage} disabled={sending}>
      {sending ? 'Sending...' : 'Send Message'}
    </button>
  );
};

export default SendMessageButton;