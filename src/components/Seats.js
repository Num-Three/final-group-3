function Seats ({seatnum, id, onClick, isSelected}){

    return(
        <button className= {`grid-item ${!isSelected ?  ("selected"): ("unselected")} `} id={id} onClick={onClick}>
           <p className="grid-text">{seatnum}</p> 
        </button>
    );
}

export default Seats