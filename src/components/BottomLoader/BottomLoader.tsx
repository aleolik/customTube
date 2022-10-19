import './BottomLoader.css'

export const BottomLoader = () => {
    return(
        <div>
            <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <span>Loading</span>
                </div>
        </div>
    )
}