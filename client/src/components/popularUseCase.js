import "./popularUseCase.css";

export default function PopularUseCase(props) {
    return (
        <div className="column popularUseCase">
            <img alt="A screenshot of a popular use case of this app." className="circleImage" src={props.src} />
            <p className="popularUseCaseText">{props.text}</p>
        </div>
    )
}
