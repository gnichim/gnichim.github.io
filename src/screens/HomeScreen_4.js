import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Col, Row, ListGroup, Form, Dropdown, Button } from 'react-bootstrap'

const HomeScreen = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const [allAnswers, setAllAnswers] = useState([])

  const [countClickedAnswers, setCountClickedAnswers] = useState(0)
  const [clickColor, setClickColor] = useState(false)

  const [quizzSelected, setQuizzSelected] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      //   setLoading(true)
      try {
        let { data } = await axios.get('https://opentdb.com/api_category.php')
        setData(data.trivia_categories)
      } catch (error) {
        console.error(error.message)
      }
      //   setLoading(false)
    }

    fetchData()

    // fetch('https://opentdb.com/api_category.php')
    //   .then((response) => response.json())
    //   .then((data) => setData(data.trivia_categories))
  }, [])

  //   console.log('data: ', data)

  const handleCategory = (e) => {
    Object.values(data).forEach((val) => {
      //   console.log(val.name)

      // Get the name by selected id
      // eslint-disable-next-line no-undef
      if (e === val.name) {
        setCategoryId(data.indexOf(val) + 9)
        // console.log('name: ', e)
        // console.log('indexxxx: ', data.indexOf(val) + 9)
        // console.log('categoryId: ', categoryId)
      }
    })

    setCategoryName(e)
  }

  const handleDifficulty = (e) => {
    setDifficulty(e)
  }

  const selectHandler = async () => {
    console.log('selectHandler')
    try {
      setLoading(true)
      console.log('categoryId: ', categoryId)
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=${difficulty}&type=multiple`
      )
      setQuizzSelected(data.results)
      // loop through every single object
      for (let i = 0; i < data.results.length; i++) {
        const object = data.results[i]
        console.log('object: ', object)
        let all_answers = [
          ...data.results[i].incorrect_answers,
          data.results[i].correct_answer,
        ]

        setAllAnswers(all_answers)
        console.log('all_answers: ', all_answers)
        // for (let i = 0; i < allAnswers.length; i++) {
        //   console.log('allAnswers[i]: ', allAnswers[i])
        //   arr.push(allAnswers[i])
        //   setA(arr)
        //   // console.log('a---: ', arr)
        // }
        // answers.forEach((ans) => {
        //   a.push(ans)
        // })
      }
      // console.log('a///: ', arr)

      // const allll = [
      //   all_answers,
      //   all_answers,
      //   all_answers,
      //   all_answers,
      //   all_answers,
      // ]
      // console.log('allll: ', allll)
    } catch (error) {
      console.error(error.message)
    }
    setLoading(false)
  }
  console.log('quizzSelected:*** ', quizzSelected)

  // const concat_answers = () => {
  //   for (let i = 0; i <= allAnswers.length; i++) {
  //     console.log('allAnswers+*+*+*: ', allAnswers)
  //     // let b = [...allAnswers[i], allAnswers[i]]
  //     // setA(b)
  //   }
  //   console.log('a: -*-*-* ', a)
  // }

  // concat_answers()

  const clickAnswer = () => {
    setCountClickedAnswers(countClickedAnswers + 1)
    console.log('countClickedAnswers: ', countClickedAnswers)
    setClickColor(!clickColor)
  }

  return (
    <>
      <h1>QUIZ MAKER</h1>
      {/* <Row>
        {data.map((category) => (
          <Col>
            <h3>{category.name}</h3>
          </Col>
        ))}
      </Row> */}
      {/* <ListGroup.Item className='pt-5'> */}
      <Row className='pt-5'>
        {/* <Col>
            <Form.Control
              as='select'
              // value={qty}
              // onChange={(e) => setQty(e.target.value)}
            >
              {data.map((x) => (
                <option key={x.id - 9}>{x.name}</option>
              ))}
            </Form.Control>
          </Col> */}
        <Col>
          <Dropdown onSelect={handleCategory}>
            <Dropdown.Toggle variant='success' id='categorySelect'>
              {categoryName ? categoryName : 'Select a category'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {data.map((res) => (
                <Dropdown.Item key={res.id - 9} eventKey={res.name}>
                  {res.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown onSelect={handleDifficulty}>
            <Dropdown.Toggle variant='success' id='difficultySelect'>
              {difficulty ? difficulty : 'Select a difficulty'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey='easy'>Easy</Dropdown.Item>
              <Dropdown.Item eventKey='medium'>Medium</Dropdown.Item>
              <Dropdown.Item eventKey='hard'>Hard</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <ListGroup.Item>
            <Button
              onClick={selectHandler}
              id='createBtn'
              className='btn-block'
              type='button'
            >
              Create
            </Button>
          </ListGroup.Item>
        </Col>
      </Row>
      {/* </ListGroup.Item> */}
      <Row className='pt-5'>
        {quizzSelected?.map((res, index) => (
          <div key={index}>
            <p key={res.index}>
              {res.question}
              <br />
              {allAnswers?.map((res, index) => (
                <Button
                  onClick={clickAnswer}
                  variant={clickColor ? 'success' : 'light'}
                  type='button'
                  key={index}
                >
                  {res}
                </Button>
              ))}
            </p>
          </div>
        ))}
        {countClickedAnswers >= 5 && (
          <Button variant='info' type='button'>
            Submit
          </Button>
        )}
      </Row>
    </>
  )
}

export default HomeScreen
