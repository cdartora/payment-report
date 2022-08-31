import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AppointmentsContext from '../context/AppointmentsContext'
import { getUser } from '../utils/utils'
import Appointments from '../components/Appointments'
import CreateAppointmentBox from '../components/CreateAppointmentBox'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Total from '../components/Total'

export default function Dashboard() {
  const { getAppointments } = useContext(AppointmentsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      navigate('/login');
    } else {
      getAppointments();
    }

  }, []);

  return (
    <div className='text-xl'>
      <Header />
      <Total />
      <CreateAppointmentBox />
      <Appointments />
      <Footer />
    </div>
  )
}
