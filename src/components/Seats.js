function Seats ({seatnum, id, onClick, isSelected}){

    return(
        <button className= {!isSelected ? ("selected"): ("unselected")} id={id} onClick={onClick}>
            {seatnum}
        </button>
    );
}

export default Seats