import "./popularUseCase.css";

export default function PopularUseCase(props) {
    return (
        <div class="column popularUseCase">
            <img className="circleImage" src={props.src} />
            <p>{props.text}</p>
        </div>
    )
}
