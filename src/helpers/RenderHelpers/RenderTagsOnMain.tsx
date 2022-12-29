import { useEffect } from "react"
import OptionsLoader from "../../components/OptionsLoader/OptionsLoader"
import { useAppDispatch, useAppSelector } from "../../hooks/TypedHooks"
import { GET_TAGS } from "../../reducers/asyncActions/GET_TAGS"
import { ITAG } from "../../types/VideoTypes"
import RenderAlert from "../RenderAlert"


export const RenderTagsOnMain = () => {
    const dispatch = useAppDispatch()
    const {Tags,TagsErorr,TagsLoad} = useAppSelector(state => state.tags)
    const device = useAppSelector(state => state.device.device)
    const ArrValue = device === 'mobile' ? 5 : 8
    useEffect(() => {
        if (Tags.length !== ArrValue){
            // works only Tags are [] or if Tags were loaded somewhere else(on the profile page,for example)
            dispatch(GET_TAGS())
        }
    },[])
    const getVideosByTag = (tag : ITAG) => {
        console.log(tag)
    }
    return (                
        <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className="row">
                {TagsLoad && !TagsErorr
                ? (
                    <>
                        <div style={{'display':'flex'}}>
                            {[...Array(ArrValue)].map((x, i) =>
                                <button style={{'borderRadius':30,'backgroundColor':'#444','color':'white','textAlign':'center','flexBasis':(100/ArrValue)+'%'}}><OptionsLoader/></button>  
                            )}
                        </div>
                    </>

                )
                : (
                    <>
                        {Tags.length
                        ? (
                        <div style={{'display':'flex'}}>
                            {Tags.map((tag) => {
                                return(
                                    <button key={tag.id} onClick={() => getVideosByTag(tag)} className="tagButtonHover" style={{'flexBasis':(100/Tags.length)+'%'}}>{tag.label}</button>
                                )
                            })}
                        </div>)
                        : (<RenderAlert type="danger" text={TagsErorr}/>)}
                    </>
                )}
            </div>
        </div>
    )
}