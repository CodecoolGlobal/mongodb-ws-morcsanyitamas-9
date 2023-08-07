import { Outlet } from 'react-router-dom';
import PrimarySearchAppBar from '../components/Search';

export default function Layout(props) {  
  const setHide = props.setHide;
  const hide = props.hide;
  
  return (
    <div>
      <PrimarySearchAppBar hide={hide} setHide={setHide} />
      <Outlet/>
    </div>
  );
}
