class LanguageObserver {
    constructor() {
      this.subscribers = [];
      this.currentLanguage = document.documentElement.lang || 'en';
  
      const observer = new MutationObserver(() => this.handleLangChange());
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    };
  
    handleLangChange() {
      const newLanguage = document.documentElement.lang;
      if (newLanguage !== this.currentLanguage) {
        this.currentLanguage = newLanguage;
        this.notifySubscribers();
      }
    };

    autoSubscribe(component, property) {
      //autoSubscribe to reduce code repeat.
      const callback = (lang) => {
        component[property] = lang;
        component.requestUpdate();
      };
      this.subscribers.push(callback);
  
      
      const originalDisconnectedCallback = component.disconnectedCallback || (() => {});
      component.disconnectedCallback = function () {
        languageObserver.unsubscribe(callback);
        originalDisconnectedCallback.call(component);
      };
  
      callback(this.currentLanguage);
    };
  
  
    subscribe(callback) {
      this.subscribers.push(callback);
    };
  
    unsubscribe(callback) {
      this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
    };
  
    notifySubscribers() {
      this.subscribers.forEach((callback) => callback(this.currentLanguage));
    };
  
    getCurrentLanguage() {
      return this.currentLanguage;
    };
  }
  
  const languageObserver = new LanguageObserver();
  export { languageObserver };
  