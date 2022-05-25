import { useState } from 'react';

import { EngineStyle } from '../SupportEngine.style';

import { LoadingOutlined } from '@ant-design/icons';

import Avatar from '../Avatar';

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        console.log('sending email', email);
    }

    return ( 
        <div style={{
            ...EngineStyle.emailFormWindow, 
            ...{
                height: '100%',
                opacity: '1'
            }
        }}>

        <div style={{height: '0px'}}>
            <div style={EngineStyle.stripe}/>
        </div>

        <div 
            className='transition-5'
            style={{
                ...EngineStyle.loadingDiv,
                ...{
                    zIndex: loading ? '10' : '-1',
                    opacity: loading ? '0.33' : '0'
                }
            }}
        />

            <LoadingOutlined 
                className='transition-5'
                style={{
                    ...EngineStyle.loadingIcon, 
                    ...{
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '1' : '0',
                        fontSize: '82px',
                        top: 'calc(50% - 41px)',
                        left: 'calc(50% - 41px)'
                    }
                }}
            />

            <div 
                style={{
                    positon: 'absolute',
                    height: '100%',
                    width: '100%',
                    textAlign: 'center'
                }}>
                <Avatar 
                    style={{
                        position: 'relative',
                        left: 'calc(50% - 44px)',
                        top: '10%'
                    }}
                />

                <div style={EngineStyle.topText}>
                    Welcome to my <br/> support
                </div>

                <form onSubmit={ e => handleSubmit(e) }
                    style={{position: 'relative', width: '100%', top: '19.75%' }}
                >
                <input 
                    style={EngineStyle.emailInput}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Your email'
                />
                </form>

                <div style={EngineStyle.bottomText}>
                    Enter your email <br/> to get started
                </div>
            </div>

        </div>
     );
}
 
export default EmailForm;