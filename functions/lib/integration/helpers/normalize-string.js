module.exports = str => {
    return str?.replace(/áàãâ/g, 'a')
      ?.replace(/ÁÀÃÂ/g, 'A')
      ?.replace(/éê/g, 'e')
      ?.replace(/ÉÊ/g, 'E')
      ?.replace(/óõô/g, 'o')
      ?.replace(/ÓÕÔ/g, 'O')
      ?.replace(/í/g, 'i')
      ?.replace(/Í/g, 'I')
      ?.replace(/ú/g, 'u')
      ?.replace(/Ú/g, 'U')
      ?.replace(/ç/g, 'c')
      ?.replace(/Ç/g, 'C')
      ?.replace('&', 'e')
}
  