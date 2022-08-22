import React, {useState, useEffect} from 'react';
import { Input,  Button, Rate, Select, message} from 'antd';
import './styles/form.css';
import netflix from '../../images/netflix.png';
import crunchyroll from '../../images/crunchyroll.png';
import disney from '../../images/disney.png';
import amazon_prime_video from '../../images/amazon_prime_video.png';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Editor } from "@tinymce/tinymce-react";
import Cookies from 'universal-cookie';
import {API} from "../../redux/api";
import { RootState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

interface FormStruct {
  handelCreation :(user_id: Number, title: String, rating: any,streamingApps : any, reviewDescription : String, banner : any) => void;
  viewReview ?: any
}

function Form(props: FormStruct): any {
  const cookies = new Cookies();
  const userId = cookies.get('user_info')?.user_id
  const {handelCreation, viewReview} = props;
  const [reviewDescription, setreviewDescription] = useState('')
  const [streamingApps, setStreamingApps] = useState("")
  console.log(streamingApps)
  const [banner, setBanner] = useState('')
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')  
  const [imageUrl, setImageUrl] = useState();
  const [error, setError] = useState('');

  // const viewCreator = useSelector((state: RootState) => state.createReview)
  console.log(viewReview)
  useEffect(() => {
    if(viewReview !== undefined){
      setTitle(viewReview?.title)
      setreviewDescription(viewReview?.review_description)
      setStreamingApps(viewReview?.streaming_apps?.split(","))
      setRating(viewReview?.rating)
    }
  }, [viewReview])
  const fromData = new FormData;

  const handelSubmit = (e: any) => {
    e.preventDefault();
      fromData.append("file",banner)
      fromData.append("user_id", userId)
      if(title.trim() == ""){
        setError("Enter Title")
        message.error('Enter Title!'); 
      }else if (streamingApps.length === 0){
        setError("Enter Streaming Apps")
        message.error('Enter Streaming Apps!');
      }else if(rating == 0){
        setError("Rate the Anime")
        message.error('Rate the Anime!');
      }else if(banner == '' && viewReview === undefined){
        setError("Upload an image")
        message.error('Upload an Image!');
      }else if (reviewDescription.trim() === ''){
        setError("message.error('Enter Review Description'")
      }else{
        handelCreation(userId, title, rating, streamingApps, reviewDescription, fromData)
        if(banner !== ""){
          API.post("/try", fromData,{headers: {"Content-Type" : "multipart/form-data"} })
          .then((response:any): any => {
              console.log(response);
            })
            .catch((error:any): any => {
              console.log(error)
            });
        }
      }
  }

  const { Option } = Select;

const handleChangeStreamingApps = (value: any) => {
  setStreamingApps(value)
};

const handelChange = (e : any) => {
    setTitle(e.target.value)
}
const handelChangeFile = (e : any) => {
  setBanner(e.target.files[0])
}
  return (
    <>
    <h4 style= {{color : 'red'}}>{error}</h4>
    <form onSubmit={handelSubmit}>
        <div className='input_field'>
        <label htmlFor="Title">AnimeShow Title: </label>
        <Input placeholder="Title" name = 'title' value = {title} onChange={handelChange}/>
        </div>
        <div className='input_field'>
        <label htmlFor="Title">Streaming Apps: </label>
      {viewReview === undefined ?<Select
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder="Select a Streaming App"
    
    onChange={handleChangeStreamingApps}
    optionLabelProp="label">


    <Option value="netflix" label="Netflix">
      <div className="demo-option-label-item">
        <span role="img" aria-label="China">
        <img src={netflix} alt="" height={50}/>
        </span>
        Netflix
      </div>
    </Option>
    <Option value="crunchyroll" label="Crunchyroll">
      <div className="demo-option-label-item">
        <span role="img" aria-label="USA">
        <img src={crunchyroll} alt="" height={50}/>
        </span>
        Crunchyroll
      </div>
    </Option>
    <Option value="disney" label="Disney Plus">
      <div className="demo-option-label-item">
        <span role="img" aria-label="Japan">
        <img src={disney} alt="" height={50}/>
        </span>
        Disney Plus
      </div>
    </Option>
    <Option value="amazon_prime_video" label="Amazon Prime Videos">
      <div className="demo-option-label-item">
        <span role="img" aria-label="Korea">
        <img src={amazon_prime_video} alt="" height={50}/>
        </span>
        Amazon Prime Videos
      </div>
    </Option>
  </Select>
  :
  <Select
    mode="multiple"
    style={{
      width: '100%',
    }}
    value = {streamingApps}
    placeholder="Select a Streaming App"
    
    onChange={handleChangeStreamingApps}
    optionLabelProp="label">


    <Option value="netflix" label="Netflix">
      <div className="demo-option-label-item">
        <span role="img" aria-label="China">
        <img src={netflix} alt="" height={50}/>
        </span>
        Netflix
      </div>
    </Option>
    <Option value="crunchyroll" label="Crunchyroll">
      <div className="demo-option-label-item">
        <span role="img" aria-label="USA">
        <img src={crunchyroll} alt="" height={50}/>
        </span>
        Crunchyroll
      </div>
    </Option>
    <Option value="disney" label="Disney Plus">
      <div className="demo-option-label-item">
        <span role="img" aria-label="Japan">
        <img src={disney} alt="" height={50}/>
        </span>
        Disney Plus
      </div>
    </Option>
    <Option value="amazon_prime_video" label="Amazon Prime Videos">
      <div className="demo-option-label-item">
        <span role="img" aria-label="Korea">
        <img src={amazon_prime_video} alt="" height={50}/>
        </span>
        Amazon Prime Videos
      </div>
    </Option>
  </Select>
  }
        </div>

        {/* <div className='input_field'>
        <label htmlFor="Title">Title: </label>
        <Input placeholder="Title" />
        </div> */}
       <div className='input_field'>
       <label htmlFor="Title">Ratings: </label>
 {viewReview !== undefined ?
 <Rate allowHalf value ={rating} className='ratings_field' style = {{padding: '20px', margin: '20px'}}  onChange = {(value: any) => setRating(value)}/>
 :
 <Rate allowHalf className='ratings_field' style = {{padding: '20px', margin: '20px'}}  onChange = {(value: any) => setRating(value)}/>
}
 </div> 
 
 <div className='input_field'>
        <label htmlFor="Title">Upload Banner: </label>
        <Input placeholder="Title" type = 'file' name = 'title' onChange={handelChangeFile}/>
        </div>
<Editor
    value={reviewDescription}
    init={{
      height: 500,
      menubar: false
    }}
    onEditorChange={(content: any, editor : any) => {setreviewDescription(content);}}
  />

        <Button type="primary" htmlType="submit">
          {viewReview != undefined ? "Update" : "Publish"}
        </Button>
    </form>
    </>
  )
}

export default Form