#version 300 es

precision highp float;

in highp vec3 vNormal;
in highp vec2 vTextureUV;
in highp vec3 vFragPosition;

uniform sampler2D uSampler;
uniform vec2 uTextureScale;
uniform vec3 uViewPosition;
uniform vec3 uLightPosition;

out vec4 fragmentColor;

void main(void) {
  vec4 objectColor = texture(uSampler, vTextureUV * uTextureScale);

  float ambientStrength = 0.2;
  vec3 lightColor = vec3(1, 1, 1) * 0.6;
  vec3 ambientColor = ambientStrength * lightColor;

  vec3 normalizedNormal = normalize(vNormal);

  float diffuseStrength = 1.0;
  vec3 lightDirection = normalize(uLightPosition - vFragPosition);
  vec3 diffuseColor = max(dot(normalizedNormal, lightDirection), 0.0) * lightColor * diffuseStrength;

  float specularStrength = 0.6;
  vec3 viewDirection = normalize(uViewPosition - vFragPosition);
  vec3 reflectDirection = reflect(-lightDirection, normalizedNormal);

  float specularValue = pow(max(dot(viewDirection, reflectDirection), 0.0), 32.0);
  vec3 specularColor = specularStrength * specularValue * lightColor;

  vec3 lightingColor = ambientColor + diffuseColor + specularColor;
  fragmentColor = vec4(objectColor.rgb * lightingColor, 1.0);
}