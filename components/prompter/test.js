import { ComfyUIApiClient, ComfyUIWorkflow } from "@stable-canvas/comfyui-client";

const workflow = new ComfyUIWorkflow();

// connect ws client
client.connect();
const cls = workflow.classes;
const [model, clip, vae] = cls.CheckpointLoaderSimple({
    ckpt_name: "lofi_v5.baked.fp16.safetensors",
});
const enc = (text) => cls.CLIPTextEncode({ text, clip })[0];
const [samples] = cls.KSampler({
    seed: Math.floor(Math.random() * 2 ** 32),
    steps: 35,
    cfg: 4,
    sampler_name: "dpmpp_2m_sde_gpu",
    scheduler: "karras",
    denoise: 1,
    model,
    positive: enc("best quality, 1girl"),
    negative: enc(
        "worst quality, bad anatomy, embedding:NG_DeepNegative_V1_75T"
    ),
    latent_image: cls.EmptyLatentImage({
        width: 512,
        height: 512,
        batch_size: 1,
    })[0],
});
cls.SaveImage({
    filename_prefix: "from-sc-comfy-ui-client",
    images: cls.VAEDecode({ samples, vae })[0],
});
