var app = new Vue({
  el: "#app",
  data: {
    message: "Olá Vue!",
    tasks: [],
    tasksClone: {
      title: "",
      project: "",
      dueTo: "",
      isShow: false,
    },
  },
  methods: {
    getTasks() {
      fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((tarefasJson) => {
          this.tasks = tarefasJson;
        });
    },
    deleteTask(id) {
      fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
    },
    create() {
      let criar = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.tasksClone)
      };
      fetch(`http://localhost:3000/tasks/`, criar)
      this.getTasks();
    },

    mostrarParaEdicao(id){
      this.tasksClone = this.tasks.filter(element => (element.id === id))[0]
      this.tasks.forEach(el => el.id == id ? el.isShow = !el.isShow : null)
    },
    edita(id) {
      this.tasksClone = this.tasks.filter(element => (element.id === id))[0]
      this.tasks.forEach(el => el.id == id ? el.isShow = false : null)
      let requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.tasksClone)
      };
      
      fetch(`http://localhost:3000/tasks/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    },

  },
  created(){
    this.getTasks()
  },
  mounted() {
    console.log("montend");
  }
});