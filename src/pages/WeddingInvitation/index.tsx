import './index.scss';
import logo from '@/assets/wedding_invitation.svg';
import savethedate from '@/assets/save_the_date.svg';
import newpeople from '@/assets/newpeople1.svg';
import invitation from '@/assets/invitation1.svg';
import wedding_up from '@/assets/wedding_up.jpg';
import wedding_down from '@/assets/wedding_down.jpg';

interface IWeddingInvitation {

}

const WeddingInvitation: React.FC<IWeddingInvitation>  = () => {
  return (
    <>
        <div className='wedding_container'>
          <img
            className='weddingup'
            src={wedding_up}
            />
          <img
            className='weddingdown'
            src={wedding_down} 
          />
          <div className='wedding_title'>
            <img src={logo} />
            <img src={savethedate} style={{ width: '60%', height: 'auto' }} />
            <img src={newpeople} style={{ paddingTop: '30px' }} />
            <img src={invitation} style={{ paddingTop: '30px'}}/>
          </div>
        </div>
    </>
  );
};

export default WeddingInvitation;