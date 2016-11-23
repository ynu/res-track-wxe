export const getStateColor = catagory => {
  switch (catagory) {
    case 'success':
      return '#dff0d8';
    case 'warning':
      return '#faebcc';
    case 'error':
      return '#f2dede';
    default:
      return '#FFFFFF';
  }
};

export const getStateIcon = catagory => {
  switch (catagory) {
    case 'success':
      return 'weui-icon-success';
    case 'warning':
      return 'weui-icon-warn';
    case 'error':
      return 'weui-icon-cancel';
    default:
      return 'weui-icon-info-circle';
  }
};

export const getCatagoryImage = catagory => {
  switch (catagory) {
    case 'ip':
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB/ElEQVR42u2VS6tBURTH7wcg7zcZMFNmBiiPSJkzEykzCUnJWBkqEwMiJgZKJgxMkKFXkpEPs25r1Tl53hzOde/g7Pp3ztlr7bV+7b32Ol9f/2WsViv4pAQAAeBpgH6/D06nE0KhEMxms88DpNNpEIvFIBKJoNlsfh5gOBxCIBCAWCwGy+XyraTr9ZrVr9bAeaJHehqgUqmAz+cDj8dzURculwvcbjfVRSKRYL9R8Xgc5vM5PwCZTAbkcjlIpVJ2DmtBIpGATCYjOHyiFAoFCX2j0Sg/ANlsFtRqNSiVSnau1WqBSqUCnU4HFosF6vU6DAYDUiQSAY1GQ9Dj8fh9gFwuR4kwKHO+7Xab5kwmE5RKJdjv97Db7Ui1Wg0MBgP5l8tlfgD0ej0FZBYjACZBgEajcRF4Op2C0Wgku9/v5w9Aq9XeAGCiTqdzE5yxBYNBfgAw4DUAQmGSfD5/EXgymbAAxWLxNYBzx0cAzBHY7XZYLBasLZVKkQ01Go24A1w7/lQDZrOZbDabDbxeLzgcDvJDWzgchu12yw3gnmOhUKCgeO3uAVSrVbBarXRN0Qd3KplMcu+EjxwPhwOcTifSdQ3gEfR6Pbp+TB/A/8XxeOQP4J663S7tCvYCBMA5pg9sNpvX/gVcADARsyv4zmUtLwB8SAD4fwDCEMZfjW9zZMwmOWHKlAAAAABJRU5ErkJggg==';
    case 'website':
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB90lEQVR42u2Uy+tpURTHf0NFeTMxoCR5lCkl7zmK8ihlRikmBsqEiaIomWCilMyUR4xkprwywMAf873tVX653atL7v397uCsWu211llnrc/ea5/z8fG/yGazwVcqB8ABcADfArDdbj/1nwLcN3qkfwRot9tYLpdks5X5t2fj8RiDweBh41KphE6n8x6AWq1GuVwmm608Hg+TyYT8YDBI+mi3VqsV6XT6PYBwOIxQKPRp63Q61Ot18rVaLSqVysPidrsdmUzmPQDWQK/Xk20wGBCPx5FMJjGdTiEUCrFYLKiQUqkEn88ntVgsFHM6nRCLxZTH4uxEXgaYz+dUhDWUyWTo9/vweDxoNpsEtNvtMBwOoVKp0Ov10Gq1IBKJqLjL5UIqlcL1ekWj0YBAIHgdgCUZjUZks1nYbDbasUKhQC6XQywWo+eFQgEajQY+nw9er5dWFne73ZTH7MPhQGDdbvf1zzAajUIulyOfz9OOzWYz+dVqlYoUi0WYTCasVqufirMTiEQiZM9mMwJgJ/o0wC2pVqtBKpViNBqRn0gkyL/Nf71eIxAI0IgkEgkcDgfF2aj8fj+NkCm7P2wDTwHcJx2PR5rjfr8n/3Q6kX9f7Hw+U4zp5XKhGFvv4+y9p+7AM3+wv6W/AHxlcw6AA+AAfgvACSffJT8ALycTsUmj5BEAAAAASUVORK5CYII=';
    case 'ecard':
    default:
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=';
  }
};
