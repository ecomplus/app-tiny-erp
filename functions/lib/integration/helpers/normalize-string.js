module.exports = str => {
    return str?.replace(/áàãâÁÀÃÂ/g, 'a')
      ?.replace(/éêÉÊ/g, 'e')
      ?.replace(/óõôÓÕÔ/g, 'o')
      ?.replace(/íÍ/g, 'i')
      ?.replace(/úÚ/g, 'u')
      ?.replace(/çÇ/g, 'c')
      ?.replace('&', 'e')
}
  