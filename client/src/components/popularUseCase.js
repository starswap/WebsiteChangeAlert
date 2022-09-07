import "./popularUseCase.css";

export default function PopularUseCase(props) {
    return (
        <div class="column popularUseCase">
            <img alt="A screenshot of a popular use case of this app." className="circleImage" src={props.src} />
            <p>{props.text}</p>
        </div>
    )
}
