import { ListGroup } from 'react-bootstrap';
import { PersonCircle, QuestionSquare, ClockFill } from 'react-bootstrap-icons';
import home from "../../assets/home-welcome.svg";

var dummyPastMatches = [
    // {
    //   pastMatch_username: "User",
    //   start_time: "12.00pm",
    //   end_time: "12.30pm",
    //   question: "Past Palindome"
    // },
    // {
    //   pastMatch_username: "User1",
    //   start_time: "1.00pm",
    //   end_time: "1.10pm",
    //   question: "House Robber" 
    // },
    // {
    //   pastMatch_username: "User2",
    //   start_time: "6.00pm",
    //   end_time: "6.40pm",
    //   question: "Two Robber" 
    // },
    // {
    //   pastMatch_username: "User3",
    //   start_time: "7.40pm",
    //   end_time: "8.00pm",
    //   question: "Three Sum" 
    // },
    // {
    //   pastMatch_username: "User4",
    //   start_time: "8.40pm",
    //   end_time: "8.00pm",
    //   question: "Invert Binary Tree"  
    // },
    // {
    //     pastMatch_username: "User5",
    //     start_time: "10.00pm",
    //     end_time: "10.10pm",
    //     question: "Invert Binary Tree"  
    // }
  ]

const PastMatch = () => {
    return (
        <div> 
            {
            dummyPastMatches.length === 0 ? 
            <div className="text-center no-match pb-5 mb-4">
                <img className="mt-3 mb-2 home-img-style" src={home} alt="logo" />
                <p className="fw-light">Oops, seems like you have no matches so far.</p>
            </div> 
            :
            <>
            <div className="card-matches">
            <ListGroup>
                {
                    dummyPastMatches.map((item, idx) => {
                        return (
                            <ListGroup.Item action variant="primary" className="my-2 text-dark" key={idx} >
                                <div>
                                <PersonCircle className="mb-1 me-4" style={{fontSize: '16px'}}/>
                                {item.pastMatch_username}
                                </div>
                                <QuestionSquare className="mb-1 me-4" />
                                {item.question}
                                <div>
                                <ClockFill className="mb-1 me-4" />
                                {item.start_time} - {item.end_time}
                                </div>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
            <div className="text-center mt-2" style={{height: dummyPastMatches.length <= 1 ? 230 : 125}}><p>Reached the end of list.</p></div>
            </div>
            </>
            }
        </div>
    )
}

export default PastMatch
