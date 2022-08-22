import React, {useState} from 'react'
import './styles/card.css'
import { Rate, message, Popconfirm} from 'antd';
import {
  EditOutlined,
  DeleteOutlined ,
} from '@ant-design/icons';
import netflix from '../../images/netflix.png'
import crunchyroll from '../../images/crunchyroll.png'
import amazon_prime_video from '../../images/amazon_prime_video.png'
import disney from '../../images/disney.png'
import { useNavigate } from 'react-router-dom';

interface cardData {
  myReviews : any
  viewPage ?: boolean
  handelConfirmDelete ?: any
  viewAll ?: boolean
}


function Card(props: cardData) {
  const {myReviews, viewAll, handelConfirmDelete} = props
  console.log()
  const navigate = useNavigate();
 
  const cancel = (e: any) => {
    message.error('Deletion Unsuccessful');
  };

  return (
    <main className = 'card_layout'>
{myReviews?.map((dataItem: any, index : Number) => 
  <figure className="image-block">
	<h1>{dataItem?.title}</h1>

	{dataItem?.banner_image !== "" &&<img src={require(`./uploads/${dataItem?.banner_image}`)} alt="" />}
	<figcaption>
		<h3>
      <Rate  allowHalf disabled defaultValue={dataItem?.rating}/>
		</h3>
    <div className='streaming_apps'>
      {dataItem?.streaming_apps?.split(",")?.map((secondItem: any, index: number) => 
       <div>
       {secondItem === 'netflix'?
       <img src={netflix} alt="" style={{height: '40px', marginRight: '5px'}} />
       :secondItem === 'crunchyroll' ? 
        <img src={crunchyroll} alt="" style={{height: '40px', marginRight: '5px'}} />
        : secondItem === 'disney' ?
        <img src={disney} alt="" style={{height: '40px', marginRight: '5px'}} />
        :  <img src={amazon_prime_video} alt="" style={{height: '40px', marginRight: '5px'}} />
      }
       </div>
      )}
    </div>
  {!viewAll ? 
  <section className='clickables_card'>
		<button onClick= {() => navigate(`/reviewscheck/${dataItem?.review_id}`)}>
			View Reviews 
		</button>
    <div>
    <EditOutlined onClick = {() => navigate(`/updatereview/${dataItem?.review_id}`)}  className = 'action_icon update_icon' style ={{padding:'5px', fontSize:'20px', borderRadius: '8px'}}/>
    <Popconfirm
    title="Are you sure to delete this review?"
    onConfirm={
      (e: any) => {
   message.success('Review Deleted Succesfully');
    handelConfirmDelete(dataItem?.review_id)
  }}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <DeleteOutlined className = 'delete_icon' style={{borderRadius: '8px', padding:'5px', fontSize:'20px'}}/>
    </Popconfirm>
    </div>
    </section>
  :
  <section className='clickables_card'>
    <button onClick= {() => navigate(`/viewcheck/${dataItem?.review_id}`)}>
			View 
		</button>
    <div>
      <h4>{`Created-By: ${dataItem?.username}`}</h4>
    </div>
  </section>  
  }
	</figcaption>
</figure>
)}
    </main>
  )
}

export default Card