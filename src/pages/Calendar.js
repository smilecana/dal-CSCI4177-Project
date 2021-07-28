import React,{Component} from 'react';
import Modal from '../modal/calendarModal.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "../assets/css/Calendar.css";
import axios from "axios";


class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            //hide the modal until the user wants it to show
            show: false,
            event: []
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    //for showing the modal
    showModal = () => {
        //need to set the state too true
        this.setState({ show: true });
    };
    //for hiding the modal
    hideModal = () => {
        //set to false
        this.setState({ show: false });
    };
    componentDidMount() {
        axios.get("/api/events").then((response) => {
        const info = response.data;
        console.log(info);
        return this.setState({event: info.Event});
        })
    }


    render(){
        return(
            <div id="calendar">
                <main>
                    
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                    </Modal>
                    <button type="button" onClick={this.showModal}>
                        Add Event
                    </button>
                    <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[ dayGridPlugin ]}
                    events={[
                        { title: 'Canada Day', date: '2021-07-01'}
                    ]}
                    />
                </main>
            </div>
        );
    }
}
 
export default Calendar