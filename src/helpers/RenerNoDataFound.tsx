import noDataFoundImage from '../media/NoData.png'
export const RenderNoDataFound = () => {
    return(
        <img
            style={{'maxHeight':760,'maxWidth':480}}
            className='img-fluid rounded mx-auto d-block' src={noDataFoundImage} alt='emptyList'>
        </img>
    )
}