import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Image, Text, Input } from "@tarojs/components";
import day from '../../../util/day'
import ktaro from '../../../util/taro'
import api from '../../../api';
import './index.scss'

const CatList = ({ list }) => {
  const userinfo = Taro.getStorageSync('userInfo')

  const [cats, setCats] = useState([])
  const [content, setContent] = useState('')
  const [focus, setFocus] = useState(false)
  const [showOpraCatId, setShowOpraCatId] = useState('')
  const [selectCatId, setSelectCatId] = useState('')
  const [selectComment, setSelectComment] = useState({})

  const handleKeyword = (event) => {
    setContent(event.detail.value)
  }

  const handleFocus = ({ content: replyContent, userId: replyUserId, username: replyUsername }) => {
    setSelectComment({ replyContent, replyUserId, replyUsername })
    setFocus(true)
  }

  const handleDel = () => {
    ktaro.showModal({
      title: '温馨提示',
      content: `确定要删除吗？`,
      success: (res) => {
        if (res.confirm) {
          api.delCat(showOpraCatId).then((result) => {
            const newCats = cats.filter(it => it._id !== showOpraCatId)
            ktaro.showToast(result.msg)
            setCats(newCats)
            setShowOpraCatId('')
          })
        }
      },
      complete: () => {
        setShowOpraCatId('')
      }
    })
  }

  const handleLike = () => {
    api.addCatLike({ id: showOpraCatId }).then(res => {
      const newCats = cats.map(cat => {
        const { _id, likes } = cat
        if (_id === showOpraCatId) {
          return {
            ...cat,
            likes: [...likes, {
              username: userinfo.username, userId: userinfo._id
            }]
          }
        }
        return cat
      })
      ktaro.showToast(res.msg)
      setCats(newCats)
      setShowOpraCatId('')
    })
  }

  const handleAddComment = () => {
    if (!content) return;
    const data = {
      id: selectCatId, content, ...selectComment,
    }
    api.addCatComment(data).then((res) => {
      const newCats = cats.map(cat => {
        const { _id, comments } = cat
        if (_id === data.id) {
          return {
            ...cat,
            comments: [...comments, {
              ...selectComment, content, username: userinfo.username, userId: userinfo._id
            }]
          }
        }
        return cat
      })
      ktaro.showToast(res.msg)
      setCats(newCats)
      setSelectCatId('')
      setSelectComment({})
      setFocus(false)
      setContent('')
    })
  }

  useEffect(() => {
    setCats(list)
  }, [list])

  return cats.map(it =>
    <View className='cat-item df p30 bb' key={it._id}>
      <View className='cat-avatar b-radius oh mr30 fsh0' style={{ backgroundImage: `url(${it.avatar})` }}></View>
      <View className='cat-info fg1 pr'>
        <View className='user-name alink fs32'>{it.username}</View>
        <View className='cat-content'>{it.content}</View>
        {it.pictures.length > 0 && <View className='cat-pictures df'>
          {it.pictures.length === 1 && <Image mode='aspectFit' src={it.pictures[0]} />}
          {it.pictures.length === 2 && it.pictures.map((pic, idx) =>
            <View className='cat-pic cat-pic-2' key={idx} style={{ backgroundImage: `url(${pic})` }}></View>
          )}
          {it.pictures.length > 2 && it.pictures.map((pic, idx) =>
            <View className='cat-pic cat-pic-gt3' key={idx} style={{ backgroundImage: `url(${pic})` }}></View>
          )}
        </View>}
        <View className='cat-time df-ac-sb mt20 mb20 pr'>
          <View className='gray fs24'>{day.fromNow(it.timeStamp, false)}</View>
          <View className='iconfont icon-gengduo fs40 gray' onClick={() => setShowOpraCatId(showOpraCatId === it._id ? '' : it._id)}></View>
          {it._id === showOpraCatId && <View className='opra-cat pa b-radius box-shadow df-ac-sa bgfff p20'>
            <View className='opra-cat-btn dark tac' onClick={handleLike}>点赞</View>
            {userinfo._id === it.userId && <View className='opra-cat-btn dark tac' onClick={handleDel}>删除</View>}
          </View>}
        </View>
        {(it.likes.length > 0 || it.comments.length > 0) && <View className='bgagray b-radius'>
          {it.likes.length > 0 && <View className='cat-likes bb'>
            <Text className='iconfont icon-baokuan- fs32 mr20'></Text>
            {it.likes.map((like, idx) =>
              <Text key={like._id}>
                <Text className='alink'>{like.username}</Text>{idx + 1 < it.likes.length ? ', ' : ' '}
              </Text>
            )}
          </View>}
          {it.comments.length > 0 && <View className='cat-comments'>
            {it.comments.map(comment =>
              <View className='comment-item' key={comment._id}>
                <View>
                  <Text className='alink'>{comment.username}</Text>
                  {comment.replyUserId ? <Text>
                    &nbsp;回复&nbsp;<Text className='alink'>{comment.replyUsername}</Text>：
                  </Text> : '：'}
                  <Text className='dark' onClick={() => handleFocus(comment)}>{comment.content}</Text>
                </View>
              </View>
            )}
          </View>}
        </View>}
        <View className='comment-input mt20 mb20 b-radius box-shadow'>
          <Input
            className='fs28'
            placeholder={selectComment.replyUserId ? `回复${selectComment.replyUsername}：` : '说点什么吧...'}
            confirmType='done'
            value={content}
            onInput={handleKeyword}
            focus={focus}
            onFocus={() => setSelectCatId(it._id)}
            onBlur={() => setFocus(false)}
            onConfirm={handleAddComment}
          />
        </View>
      </View>
    </View>
  )
}

export default CatList