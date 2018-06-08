{% for name, value in env_vars.items() %}
export {{name}}="{{value}}"
{% endfor %}
