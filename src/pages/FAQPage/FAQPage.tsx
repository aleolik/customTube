import React, { useState } from 'react'
import './FAQPage.css'
import howToMakeVideo from '../../media/imagesHelpers/howToMakeVideo.png'
export interface listItemInterface{
  question : string
  answer : string
  image? : string
  steps? : string[]
  link? : string
  linkName? : string
}
const FAQPage = () => {
  const [currentQuestion,setCurrentQuestion] = useState<number>(-1)
  const getAnswer = (index : number) => {
    if (currentQuestion === index){
      setCurrentQuestion(-1)
    }
    else{
      setCurrentQuestion(index)
    }
  }
  const list : listItemInterface[] = [
    {
      'question' : 'About platform?',
      'answer' : 'Free-to-use platform for watching and making videos',
    },
    {
      'question' : 'How to create video?',
      'answer' : `To create and upload video,you need :`,
      'steps' : [
        '1)Go to your profile Page',
        `2)Click 'Add video'`,
        '3)Fill all the necessary fields',
        `4)Click 'Upload Video'`
      ],
      'image' : howToMakeVideo
    },
    {
      'question' : 'How to create account?',
      'answer' : 'Clcik "Sign In",then select register or login  with google'
    },
    {
      'question' : 'What purproses of making the platform?',
      'answer' : 'To practice and try new tecnhologies'
    },
    {
      'question' : 'Can i see the code of the platform?Where?',
      'answer' : 'Yes you can,',
      'link':'https://github.com/aleolik/customTube',
      'linkName':'Here'
    },
    {
      'question' : 'Who is the creator?',
      'answer' : 'The creator is',
      'link' : 'https://github.com/aleolik/',
      'linkName' : 'github'
    }
  ]
  return (
    <section className="faq-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
              <div className="faq-title text-center pb-3">
                <h2>FAQ</h2>
              </div>
          </div>
                    <div className="col-md-6 offset-md-3">
                        <div className="faq" id="accordion">
                            {list.map((item,index) => {
                              return(
                                <div className="card" onClick={() => getAnswer(index)}>
                                    <div className="card-header" id="faqHeading-1">
                                        <div className="mb-0">
                                            <h5 className="faq-title" data-toggle="collapse" data-target="#faqCollapse-1" data-aria-expanded="true" data-aria-controls="faqCollapse-1">
                                                <span className="badge">{index+1}</span>{item.question}
                                            </h5>
                                        </div>
                                    </div>
                                    {index === currentQuestion && (
                                       <div id="faqCollapse-1"  aria-labelledby="faqHeading-1" data-parent="#accordion">
                                       <div className="card-body">
                                           <p>{item.answer} {item.linkName && <p><a style={{'textDecoration':'none','color':'blue','fontSize':30}} href={item.link}>{item.linkName}</a></p>}</p>
                                       </div>
                                       {item.steps?.length && (
                                        <ul style={{'listStyleType':'none'}}>
                                          {item.steps.map((step) => {
                                            return(
                                              <li>{step}</li>
                                            )
                                        })}
                                        </ul>
                                       )}
                                       {item.image && (
                                        <img className='rounded mx-auto d-block img-fluid' alt='item' src={item.image}/>
                                       )}
                                   </div>
                                    )}
                                </div>
                              )
                            })}
                        </div>
                    </div>
                  </div>
                </div>
    </section>
  )
}

export default FAQPage