def obtainChanges(){
    def arr_new = env.addFiles.split('\n')
    result_new = ''
    def tempResult_new = '';
    def folders_new = '';
    for(int i = 0; i < arr_new.length;i++){
        def file_new = arr_new[i]
        if(file_new.startsWith('microservices/services/')){
            result_new = "${result_new}${file_new},"
        }
    }
    def arr_comma_new = result_new.split(",")
    for (int j = 0; j < arr_comma_new.length; j++) {
            def folderDirectory_new = arr_comma_new[j].split('/')
            for(int z = 0; z < folderDirectory_new.length; z++){
            if(folderDirectory_new[z] == "services" && z+1 < folderDirectory_new.length && folderDirectory_new[z+1] != ".DS_Store"){
                tempResult_new = "${tempResult_new}${folderDirectory_new[z+1]} "
                break
            }
        }
    }

    def resultS_new = tempResult_new.tokenize(' ')
    resultS_new = resultS_new.unique()
    for(int i = 0; i < resultS_new.size(); i++){
        folders_new="${folders_new}${resultS_new[i]},"
    }
    echo "new: ${folders_new}"
    env.folders_new =  "${folders_new}"

    def arr = env.modifiedFiles.split('\n')
    result = ''
    def tempResult = '';
    def folders = '';
    for(int i = 0; i < arr.length;i++){
        def file = arr[i]
        if(file.startsWith('microservices/services/')){
            result = "${result}${file},"
        }
    }
    def arr_comma = result.split(",")
    for (int j = 0; j < arr_comma.length; j++) {
            def folderDirectory = arr_comma[j].split('/')
            for(int z = 0; z < folderDirectory.length; z++){
            if(folderDirectory[z] == "services" && z+1 < folderDirectory.length && folderDirectory[z+1] != ".DS_Store"){
                tempResult = "${tempResult}${folderDirectory[z+1]} "
                break
            }
        }
    }

    def resultS = tempResult.tokenize(' ')
    resultS = resultS.unique()
    for(int i = 0; i < resultS.size(); i++){
        folders="${folders}${resultS[i]},"
    }
    echo "modified: ${folders}"
    env.folders =  "${folders}"
}

pipeline{
    
    agent any
    environment{
        dockerImage = ''
        directory = './microservices/services/'
        registry = 'jh7939/microservices:'
        registry_mono = 'jh7939/monolithic:monolithic-app'
        registryCredential = 'dockerhub_id'
    }
    
    stages{
        stage('Checkout'){
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/hxk1633/Microservices-Project']]])
            }
        }
        stage('Microservice detect change'){
            steps{
                script{
                    env.addFiles = sh (
                        script: 'git diff --diff-filter=A --name-only $GIT_PREVIOUS_COMMIT $GIT_COMMIT ',
                        returnStdout: true).trim()
                    env.modifiedFiles = sh (
                        script: 'git diff --diff-filter=M --name-only $GIT_PREVIOUS_COMMIT $GIT_COMMIT ',
                        returnStdout: true).trim()
                }
                obtainChanges()
            }
        }
        stage('Microservice Build and upload Docker image(modified)'){
            steps{
                script{
                    if(env.folders != ''){
                        try{
                            def arr = env.folders.split(',')
                            for(int i = 0; i <arr.length; i++){
                                dir("${directory}${arr[i]}"){
                                    dockerName = "${registry}${arr[i]}_microservice"
                                    dockerImage = docker.build dockerName
                                    docker.withRegistry('', registryCredential){
                                        dockerImage.push()
                                    }
                                }
                            }
                        }catch(Exception e){
                            echo "Microservice Build and upload Docker image(modified) failed"
                            currentBuild.result = 'FAILURE'
                        }
                    }
                }
            }
        }

        stage('Microservice Build and upload Docker image(add)'){
            steps{
                script{
                    if(env.folders_new != ''){
                        try{
                            def arr_new = env.folders_new.split(',')
                            for(int i = 0; i <arr_new.length; i++){
                                dir("${directory}${arr_new[i]}"){
                                    echo arr_new[i]
                                    dockerName = "${registry}${arr_new[i]}_microservice"
                                    dockerImage = docker.build dockerName
                                    docker.withRegistry('', registryCredential){
                                        dockerImage.push()
                                        }
                                    }
                                }
                        } catch(Exception e){
                            echo "Microservice Build and upload Docker image(add) failed"
                            currentBuild.result = 'FAILURE'
                        }
                    }
                }
            }
        }
        stage('Microservice task (modified)'){
            steps{
                script{
                    try{
                        if(env.folders != '' ){
                            dir("./microservices"){
                                flag = "edit"
                                sh "bash sshlogin.sh ${env.folders} ${flag}" 
                            }
                        }
                    }catch(Exception e){
                            echo "Microservice task (modified) failed"
                            currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
        stage('Microservice task (add)'){
            steps{
                script{
                    try{
                        if(env.folders_new != ''){
                            dir("./microservices"){
                                flag_new = "new"
                                sh "bash sshlogin.sh ${env.folders_new} ${flag_new}" 
                            }
                        }
                    }catch(Exception e){
                            echo "Microservice task (add) failed"
                            currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
        stage('Monolithic detect changes, build ,and push images'){
            when{
                changeset "monolithic-app/*"
            }
            steps{
                script{
                    try{
                        dir("monolithic-app"){
                            dockerImage = docker.build registry_mono
                            docker.withRegistry('', registryCredential){
                                        dockerImage.push()
                            }
                        }
                    }catch(Exception e){
                            echo "Monolithic detect failed"
                            currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
        stage('Monolithic task'){
            when{
                changeset "monolithic-app/*"
            }
            steps{
                script{
                    try{
                        dir("monolithic-app"){
                        sh "bash sshlogin.sh"
                        }
                    }catch(Exception e){
                        echo "Monolithic task failed"
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}
