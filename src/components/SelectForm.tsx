import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
import Select, { GroupBase,ActionMeta } from 'react-select'
import { useAppDispatch, useAppSelector } from '../hooks/TypedHooks'
import { GET_TAGS } from '../reducers/asyncActions/GET_TAGS'
import { ITAG } from '../types/VideoTypes'
import makeAnimated from 'react-select/animated'




interface SelectFormProps{
    setChosenTags : (value:ITAG[]) => void
}
export type Option = unknown

export const checkIfTag = (option:any[]) : boolean => {
    let returnValue : boolean = false
    option.map((opt) => {
        if (opt?.value && opt?.label){
            returnValue = true
        }
    })
    return returnValue
}

export const SelectForm : FC<SelectFormProps> = ({setChosenTags}) => {
    const animatedComponents = makeAnimated();
    const dispatch = useAppDispatch()
    useEffect(() => {
       dispatch(GET_TAGS(true))
    },[])
    const {Tags,TagsErorr,TagsLoad} = useAppSelector(state => state.tags)

    const selectorOnChange = (option: readonly Option[], actionMeta: ActionMeta<Option>) => {
        if (Array.isArray(option) && checkIfTag(option)){
            setChosenTags(option)
        }
    }

    return(
        <div style={{'marginBottom':65,'zIndex':1000000}}>
            <h4 style={{'textAlign':'center'}}>Tags,so your video will be easier to find(not necreassary)</h4>
            <Select
                isMulti
                components={animatedComponents}
                closeMenuOnSelect={false}
                closeMenuOnScroll={true}
                name="tags"
                options={Tags}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={selectorOnChange}
            />
        </div>
    )
}