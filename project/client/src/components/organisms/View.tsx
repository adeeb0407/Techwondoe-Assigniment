import React from 'react'
import './styles/view.css'
import { Avatar, List, Divider,Typography, Rate, Popconfirm, message } from 'antd';
import netflix from '../../images/netflix.png'
import crunchyroll from '../../images/crunchyroll.png'
import amazon_prime_video from '../../images/amazon_prime_video.png'
import disney from '../../images/disney.png'
import parse from 'html-react-parser';
import {
  EditOutlined,
  DeleteOutlined ,
} from '@ant-design/icons';
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom'
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { login} from '../../redux/action-creators/index'
import { bindActionCreators } from 'redux';

interface ViewStruct {
    viewReview : {}[]
    id : any
    justView ?: boolean
}

function View(props: ViewStruct) {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { MyReviewAction, deleteReviewHandel } = bindActionCreators(actionCreators, dispatch)

  const handelConfirmDelete = (review_id : any) => {
    deleteReviewHandel(review_id)
    message.success('Review Deleted Succesfully');
    navigate('/')
  } 

  const cancel = (e: any) => {
    message.error('Deletion Unsuccessful');
  };

    const cookies = new Cookies();
    const {viewReview, id, justView} = props
  return (
    <div>
      {viewReview?.map((dataItem: any, index: number)=> 
      <div>
             <div className ='view_main'>
        <Divider orientation="left">Anime Infomration</Divider>
           <section>
        <div className='main_list_view'>
           <Divider orientation="left">Title</Divider>
           <List size="large">
        <List.Item>
          <h1 style = {{fontSize: '20px'}}>{dataItem?.title}</h1>
        </List.Item>
        </List>
           <Divider orientation="left">Ratings</Divider>
           <List size="large">
        <List.Item>
          <Typography.Text><Rate  allowHalf disabled defaultValue={dataItem?.rating}/></Typography.Text>
        </List.Item>
        </List>
           <Divider orientation="left">Streaming Platforms</Divider>
           <List size="large">
        <List.Item>
        {dataItem?.streaming_apps?.split(",")?.map((secondItem: any, index: number) => 
       <div>
       {secondItem === 'netflix'?
       <img src={netflix} alt="" style={{height: '80px', marginRight: '5px'}} />
       :secondItem === 'crunchyroll' ? 
        <img src={crunchyroll} alt="" style={{height: '80px', marginRight: '5px'}} />
        : secondItem === 'disney' ?
        <img src={disney} alt="" style={{height: '80px', marginRight: '5px'}} />
        :  <img src={amazon_prime_video} alt="" style={{height: '80px', marginRight: '5px'}} />
      }
       </div>
      )}
        </List.Item>
        </List>
        <div>
    {!justView ?
    <>
    <EditOutlined onClick = {() => navigate(`/updatereview/${dataItem?.review_id}`)}  className = 'action_icon update_icon' style ={{padding:'5px', fontSize:'20px', borderRadius: '8px'}}/>
    <Popconfirm
    title="Are you sure to delete this review?"
    onConfirm={
      (e: any) => {
    handelConfirmDelete(dataItem?.review_id)
  }}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <DeleteOutlined className = 'delete_icon' style={{borderRadius: '8px', padding:'5px', fontSize:'20px'}}/>
    </Popconfirm>
    </>
    :
    <div>
       <h4>{`Created-By: ${dataItem?.username}`}</h4>
    </div>
  }
    </div>
        </div>
           </section>
             <aside className='image_main'>
           <img  src={require(`./uploads/${dataItem?.banner_image}`)} alt="" className= 'image_banner'/>
           </aside>
           </div>
           <div className='review_content'>
           <Divider orientation="left">Review</Divider>
           <List>
           <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={<a href="https://github.com/adeeb0407">{cookies.get('user_info')?.username || dataItem?.username}</a>}
          description={parse(dataItem?.review_description)}
        />
    </List> 
    </div>  
      </div>
      )}
{/* <Card myReviews = {viewReview} viewPage = {true}/> */}
    </div>
  )
}

export default View