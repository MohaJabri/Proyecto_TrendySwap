import Layout from '../../hocs/Layout'
import {useParams} from 'react-router'
import { useState } from 'react'
import { connect } from 'react-redux'
import { activate } from '../../redux/actions/auth'
import { Navigate } from 'react-router'

import {TailSpin} from 'react-loader-spinner'

const Activate = ({
  activate,
  loading
}) =>{
    const params = useParams()
    const [activated, setActivated] = useState(false);

    const activate_account = () => {
      const uid = params.uid
      const token = params.token
      activate(uid, token);
      setActivated(true);
    }

    if (activated && !loading)
    return <Navigate to='/' />;
    
    return (
      <Layout>
        <div className="bg-white min-h-screen ">
          {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
          <div className="max-w-3xl mx-auto flex justify-center ">
          
          {loading ? 
          <button
            className="inline-flex mt-12 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <TailSpin

            color="#fff"
            width={20}
            height={20}
            />
          </button>:
          <button
          onClick={activate_account}
          className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Activar cuenta
        </button>
        }

      
          </div>
        </div>
      </Layout>
    )
  }

  const mapStateToProps = state => ({
    loading: state.Auth.loading
  })
  
  export default connect(mapStateToProps,{
    activate
  }) (Activate)