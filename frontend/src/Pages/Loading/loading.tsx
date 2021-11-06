import "./loading.css";

const greenMushroom = "https://i.imgur.com/AkFtaG9.gif"; 
const redMushroom = "https://i.imgur.com/kDDFvUp.png";

const Loading = (props: any) => {
    return (
        <div className="preloader">
            <img src={props.isRed ? redMushroom : greenMushroom} className="rotate" width="200" height="200" alt="mushroom" />
        </div>
    )
}

export default Loading;