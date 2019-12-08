import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import renderer from 'react-test-renderer'

// import React from 'react'
// import { shallow, mount } from 'enzyme'
import Repo from './Repo'

configure({ adapter: new Adapter() })

const repo = {
  id: 11111,
  homepage: 'homepage',
  htmlUrl: 'html',
  name: 'name',
  fork: true,
  forks: 100,
  language: 'JS',
  description: 'description',
  stargazersCount: 20
}

describe('<Repo />', () => {
  it('Renders empty Repo', () => {
    const component = renderer.create(<Repo />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Renders Repo with props', () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const component = renderer.create(<Repo key={repo.id} {...repo} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('<Repo /> shallow tests', () => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const component = shallow(<Repo key={repo.id} {...repo} />)

  it('Renders with props', () => {
    expect(component).toMatchSnapshot()
  })

  it('has ListGroupItem', () => {
    expect(component.find('ListGroupItem')).toHaveLength(1)
  })
  it('has ListGroupItemHeading', () => {
    expect(component.find('ListGroupItemHeading')).toHaveLength(1)
  })
  it('has a', () => {
    expect(component.find('a')).toHaveLength(1)
  })
  it('a has href=html', () => {
    expect(component.find('a').prop('href')).toEqual('html')
  })
  it('has a > name', () => {
    expect(component.find('a').text()).toEqual('name')
  })
  it('has span.fork', () => {
    expect(component.find('span.fork')).toHaveLength(1)
  })
  it("span.fork has text it's a fork", () => {
    expect(component.find('span.fork').text()).toEqual("it's a fork")
  })
  it('has span.forks', () => {
    expect(component.find('span.forks')).toHaveLength(1)
  })
  it('span.forks has text Forks: 100', () => {
    expect(component.find('span.forks').text()).toEqual('Forks: 100')
  })
  it('has span.stars', () => {
    expect(component.find('span.stars')).toHaveLength(1)
  })
  it('span.stars has text Stars: 20', () => {
    expect(component.find('span.stars').text()).toEqual('Stars: 20')
  })
  it('has span.language', () => {
    expect(component.find('span.language')).toHaveLength(1)
  })
  it('span.language has text Language: JS', () => {
    expect(component.find('span.language').text()).toEqual('Language: JS')
  })
  it('has span.homepage', () => {
    expect(component.find('span.homepage')).toHaveLength(1)
  })
  it('span.homepage has text Stars: 20', () => {
    expect(component.find('span.homepage').text()).toEqual('Homepage: homepage')
  })
  it('has span.description', () => {
    expect(component.find('span.description')).toHaveLength(1)
  })
  it('span.description has text Description: description', () => {
    expect(component.find('span.description').text()).toEqual(
      'Description: description'
    )
  })
})
