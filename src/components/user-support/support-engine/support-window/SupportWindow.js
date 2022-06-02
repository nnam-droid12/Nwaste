import EmailForm from "./EmailForm";

import { EngineStyle } from '../SupportEngine.style';

const SupportWindow = props => {
    // state
    return ( 
        <div 
        className="transition-5"
        style={{
            ...EngineStyle.supportWindow,
            ...{opacity: props.visible ? '1' : '0'}
        }}>
            <EmailForm />
        </div>
     )
}
 
export default SupportWindow;