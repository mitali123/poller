pipeline {
  environment {
    /*UNCOMMENT BELOW FOR WEBAPP REPO*/
    //REPO_NAME = "webapp"
    
    /*UNCOMMENT BELOW FOR POLLER REPO*/
    REPO_NAME = "poller" 
    
    /*UNCOMMENT BELOW FOR NOTIFIER REPO*/
    //REPO_NAME = "notifier"
    
     registry = "divyavgirase/${REPO_NAME}" 
    //registry = "mitalimanjarekar/${REPO_NAME}"
     
    registryCredential = 'dockerhub_cred'   //dockerhub_cred
    GIT_HASH = ''
    registry_url = "https://registry-1.docker.io/"
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git branch: 'master',credentialsId: 'git_cred', url: "https://github.com/csye7125-advanced-cloud/${REPO_NAME}.git"
      }
    }
    stage('Building image') {
      steps{
          sh 'ls -al'
        script {
          GIT_HASH = sh(script: "git rev-parse HEAD", returnStdout: true)
          sh(script: "docker build . -t ${REPO_NAME}")
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
        withCredentials([usernamePassword( credentialsId: 'dockerhub_cred', usernameVariable: 'USER', passwordVariable: 'PASSWORD')]) {
                withDockerRegistry([ credentialsId: "dockerhub_cred", url: "${registry_url}" ]){  
                        sh(script: "docker login -u $USER -p $PASSWORD")
                        sh(script: "docker tag ${REPO_NAME} ${registry}:${GIT_HASH}")
                        sh(script: "docker push ${registry}:${GIT_HASH}") 
                }
                
            }
        }
      }
    }

    stage('Deploy To K8S'){
      steps{
        sh "helm install poller ./helm/ --set image.repository=${registry} --set environment.dbusername=admin --set environment.dbpassword=Sqladmin123 --set environment.dbname=poller --set environment.dbhost=poll.c45kjm7vfx2e.us-east-1.rds.amazonaws.com --set image.tag=${GIT_HASH} "
       // --set  --set environment.dbusername=admin --set environment.dbpassword=Sqladmin123
        }
    }
  }
}

