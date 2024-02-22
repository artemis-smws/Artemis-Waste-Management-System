import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import '../styles/AddWaste.scss'

const MyDatePicker: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
    const handleChange = (date: Date | null) => {
      setSelectedDate(date);
    };
  
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <DatePicker
              selected={selectedDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
      </div>
    );
}

export default MyDatePicker