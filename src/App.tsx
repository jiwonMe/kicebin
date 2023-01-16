import { useState } from 'react'
import styled from 'styled-components'
import Editor from './Editor'
import Logo from './Logo'
import Viewer from './Viewer'
import { Layout, Col, Row, Menu, Button } from 'antd'

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  const [problem, setProblem] = useState<ProblemSchema>({
    id: 0,
    problemNumber: '',
    question: '',
    question2: '',
    conditions: ['', '', ''],
    examples: {
      first: '',
      second: '',
      third: '',
    },
    choices: [],
  })

  return (
    <>
    <Layout>
      <Header>
        <Logo />
      </Header>
      <Layout>
        <Sider>
          <Menu
            mode='inline'
            style={{
              height: '100%',
            }}
            items={[
              {
                key: '1',
                label: '문항 관리',
              }
            ]}
          />
        </Sider>
        <MainLayout>
          <ContentArea>
            <Row
              style={{
                flexFlow: 'unset',
              }}
            >
              <Col flex={3} style={{
                maxWidth: '600px',
              }}>
                <Editor
                  problem={problem}
                  setProblem={setProblem}
                />
                <Button>다음</Button>
              </Col>
              <Col flex={1} style={{
                maxWidth: '600px',
              }}>  
                <Viewer problem={problem} />
              </Col>
            </Row>
          </ContentArea>
        </MainLayout>
      </Layout>
      <Footer>
        KICEBIN
      </Footer>
    </Layout>
    </>
  )
}

export default App

const MainLayout = styled(Content)`
  padding: 50px;
`

const ContentArea = styled.div`
  background-color: white;
  width: fit-content;
`