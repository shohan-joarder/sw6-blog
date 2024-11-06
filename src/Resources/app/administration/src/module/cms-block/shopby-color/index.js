import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'shop-by-color',
    category: 'text-image',
    label: 'Shop By Color',
    component: 'sw-cms-block-shop-by-color',
    previewComponent: 'sw-cms-preview-shop-by-color',
    defaultConfig:{
        marginBottom:"20px",
        marginTop:"20px",
        marginLeft:"20px",
        marginRight:"20px",
        sizingMode:"boxed"
    },

    slots: {
        'image1': {
            type: 'image'
        },
        'image2': {
            type: 'image'
        },
        'image3': {
            type: 'image'
        },
        'image4': {
            type: 'image'
        },
        'image5': {
            type: 'image'
        },
        'image6': {
            type: 'image'
        },
        'text1': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <p style="text-align: center;">lorem</p>
                        `
                    }
                }
            }
        },
        'text2': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <p style="text-align: center;">lorem</p>
                        `
                    }
                }
            }
        },
        'text3': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <p style="text-align: center;">lorem</p>
                        `
                    }
                }
            }
        },
        'text4': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <p style="text-align: center;">lorem</p>
                        `
                    }
                }
            }
        },
        'text5': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <p style="text-align: center;">lorem</p>
                        `
                    }
                }
            }
        },
        'text6': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <p style="text-align: center;">lorem</p>
                        `
                    }
                }
            }
        },
        'text7': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <p style="text-align: center;">#000000</p>
                        `
                    }
                }
            }
        },
        'text8': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <p style="text-align: center;">#000000</p>
                        `
                    }
                }
            }
        },
        'text9': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <p style="text-align: center;">#000000</p>
                        `
                    }
                }
            }
        },
        'text10': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <p style="text-align: center;">#000000</p>
                        `
                    }
                }
            }
        },
        'text11': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <p style="text-align: center;">#000000</p>
                        `
                    }
                }
            }
        },
        'text12': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <p style="text-align: center;">#000000</p>
                        `
                    }
                }
            }
        }
    }

});