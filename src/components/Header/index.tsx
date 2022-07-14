import './index.scss'
import { useEffect } from 'react'
import Worker from './webworker.js?worker'
import SvgIcon from '../SvgIcon'

const icons = import.meta.globEager('../../assets/icons/logo-*.svg')
const iconUrls = Object.values(icons).map((mod) => {
  // 如 ../../assets/icons/logo-1.svg -> logo-1
  const fileName = mod.default.split('/').pop()
  const [svgName] = fileName.split('.')
  return svgName
})

const worker = new Worker()

worker.addEventListener('message', (e) => {
  console.log(e)
})

export function Header() {
  useEffect(() => {
    console.log('iconUrls', iconUrls)
  }, [])
  return (
    <div>
      {iconUrls.map((item) => (
        <SvgIcon name={item} key={item} width="50" height="50" />
      ))}
    </div>
  )
}
