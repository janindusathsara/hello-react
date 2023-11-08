const Car = (props) => {

    return (
        <div>
            <h3>Car Model - {props.model}</h3>
            {props.description && //show only if description is there: CONDITIONAL RENDERING
                <p>{props.description}</p>
            }
        </div>
    )
}

export default Car;