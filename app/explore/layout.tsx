import { ReactNode } from 'react'
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'


interface ExploreLayoutProps {
  children: ReactNode
}

const ExploreLayout: React.FC<ExploreLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <Footer />
    </div>
  )
}

export default ExploreLayout