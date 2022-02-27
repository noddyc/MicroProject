pipeline{
    
    agent any
    
    environment{
        dockerImage = ''
        registry = 'jh7939/monolithic:haproxy' 
        registryCredential = 'dockerhub_id'
    }
    
    stages{
        stage('Checkout'){
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/test']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/noddyc/MicroProject']]])
 
          
            }
        }
        stage('Build Docker image'){
            steps{
                script{
//                     sh 'cd haproxy'
//                     sh 'cd haproxy'
//                     sh 'ls'
                       sh 'docker build -t jh7939/monolithic:haproxy ./haproxy'
//                     dockerImage = docker.build registry
                }
            }
        }
        
//         stage("Uploading Image"){
//             steps{
//                 script{
//                         docker.withRegistry('', registryCredential){
//                             dockerImage.push()
//                     }
//                 }
//             }
//         }
    }
}
