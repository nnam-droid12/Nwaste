import './Floating.Whatsapp.scss';
import FloatingWhatsApp from 'react-floating-whatsapp'

const WhatsappFloat =()=> {

  return (
      <FloatingWhatsApp  
      phoneNumber='09162270129'
      accountName='Nwaste'
      allowClickAway
      notification
      notificationSound
      notificationDelay={30000}
      darkMode
      defaultMessage={`Welcome to Nwaste customer service`}
      chatMessage = 'Hello there! 🤝 \nHow can we help you?'
      />
  )
}

export default WhatsappFloat;